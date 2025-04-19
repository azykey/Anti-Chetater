#include <windows.h>
#include <tlhelp32.h>
#include <psapi.h>
#include <vector>
#include <string>
#include <map>
#include <memory>
#include <iostream>

class MemoryMonitor {
private:
    DWORD processId;
    HANDLE processHandle;
    std::map<std::string, std::vector<std::vector<BYTE>>> memorySnapshots;
    std::vector<MEMORY_BASIC_INFORMATION> memoryRegions;

    bool OpenProcessHandle() {
        processHandle = OpenProcess(PROCESS_VM_READ | PROCESS_QUERY_INFORMATION, FALSE, processId);
        return processHandle != NULL;
    }

    void CloseProcessHandle() {
        if (processHandle) {
            CloseHandle(processHandle);
            processHandle = NULL;
        }
    }

    std::vector<BYTE> ReadMemoryRegion(const MEMORY_BASIC_INFORMATION& region) {
        std::vector<BYTE> buffer(region.RegionSize);
        SIZE_T bytesRead;
        if (ReadProcessMemory(processHandle, region.BaseAddress, buffer.data(), region.RegionSize, &bytesRead)) {
            buffer.resize(bytesRead);
            return buffer;
        }
        return std::vector<BYTE>();
    }

public:
    MemoryMonitor(DWORD pid) : processId(pid), processHandle(NULL) {
        if (!OpenProcessHandle()) {
            throw std::runtime_error("Failed to open process handle");
        }
    }

    ~MemoryMonitor() {
        CloseProcessHandle();
    }

    void TakeSnapshot(const std::string& snapshotName) {
        memoryRegions.clear();
        MEMORY_BASIC_INFORMATION mbi;
        LPVOID address = NULL;

        std::vector<std::vector<BYTE>> regions;
        while (VirtualQueryEx(processHandle, address, &mbi, sizeof(mbi))) {
            if (mbi.State == MEM_COMMIT && 
                (mbi.Protect & PAGE_READWRITE) && 
                !(mbi.Protect & PAGE_GUARD)) {
                memoryRegions.push_back(mbi);
                regions.push_back(ReadMemoryRegion(mbi));
            }
            address = (LPVOID)((DWORD_PTR)mbi.BaseAddress + mbi.RegionSize);
        }
        memorySnapshots[snapshotName] = std::move(regions);
    }

    std::vector<std::string> CompareSnapshots(const std::string& snapshot1, const std::string& snapshot2) {
        std::vector<std::string> differences;
        
        if (memorySnapshots.find(snapshot1) == memorySnapshots.end() ||
            memorySnapshots.find(snapshot2) == memorySnapshots.end()) {
            differences.push_back("One or both snapshots not found");
            return differences;
        }

        const auto& snap1 = memorySnapshots[snapshot1];
        const auto& snap2 = memorySnapshots[snapshot2];

        if (snap1.size() != snap2.size()) {
            differences.push_back("Snapshot sizes differ");
            return differences;
        }

        for (size_t i = 0; i < snap1.size(); ++i) {
            if (snap1[i] != snap2[i]) {
                differences.push_back("Memory modified at region " + std::to_string(i));
            }
        }

        return differences;
    }

    bool ScanForPattern(const std::vector<BYTE>& pattern) {
        for (const auto& region : memoryRegions) {
            std::vector<BYTE> buffer = ReadMemoryRegion(region);
            if (buffer.empty()) continue;

            for (size_t i = 0; i < buffer.size() - pattern.size(); ++i) {
                bool match = true;
                for (size_t j = 0; j < pattern.size(); ++j) {
                    if (buffer[i + j] != pattern[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) return true;
            }
        }
        return false;
    }

    std::vector<MEMORY_BASIC_INFORMATION> GetMemoryRegions() const {
        return memoryRegions;
    }

    void ClearSnapshots() {
        memorySnapshots.clear();
        memoryRegions.clear();
    }
}; 