import logging
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import socketio
import json
from datetime import datetime
import os

# Configuração de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitindo todas as origens para desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montando o diretório estático
app.mount("/static", StaticFiles(directory="static"), name="static")

try:
    # Configuração do Socket.IO
    sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=['*'])
    socket_app = socketio.ASGIApp(sio, app)
    logger.info("Socket.IO configurado com sucesso")
except Exception as e:
    logger.error(f"Erro ao configurar Socket.IO: {e}")
    raise

# Dados de exemplo
players = [
    {"id": 1, "name": "Player1", "status": "Normal", "reputation": 85, "lastSeen": datetime.now().isoformat()},
    {"id": 2, "name": "Player2", "status": "Suspicious", "reputation": 45, "lastSeen": datetime.now().isoformat()},
    {"id": 3, "name": "Player3", "status": "Banned", "reputation": 10, "lastSeen": datetime.now().isoformat()},
]

alerts = [
    {"id": 1, "severity": "warning", "message": "Jogador Player2 detectado com velocidade anormal"},
    {"id": 2, "severity": "error", "message": "Jogador Player3 banido por uso de cheats"},
]

@app.get("/")
async def root():
    logger.info("Requisição recebida na rota raiz")
    return FileResponse('static/index.html')

@app.get("/api/players")
async def get_players():
    logger.info("Requisição recebida para listar jogadores")
    return players

@app.get("/api/alerts")
async def get_alerts():
    logger.info("Requisição recebida para listar alertas")
    return alerts

@app.get("/api/stats")
async def get_stats():
    logger.info("Requisição recebida para obter estatísticas")
    return {
        "totalPlayers": len(players),
        "suspiciousPlayers": len([p for p in players if p["status"] == "Suspicious"]),
        "bannedPlayers": len([p for p in players if p["status"] == "Banned"]),
        "detection_rate": 95,
        "false_positives": 2
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        await websocket.accept()
        logger.info("Nova conexão WebSocket estabelecida")
        
        while True:
            try:
                data = await websocket.receive_text()
                logger.info(f"Dados recebidos via WebSocket: {data}")
                
                await websocket.send_json({
                    "players": players,
                    "alerts": alerts,
                    "stats": {
                        "totalPlayers": len(players),
                        "suspiciousPlayers": len([p for p in players if p["status"] == "Suspicious"]),
                        "bannedPlayers": len([p for p in players if p["status"] == "Banned"])
                    }
                })
            except Exception as e:
                logger.error(f"Erro durante comunicação WebSocket: {e}")
                break
    except Exception as e:
        logger.error(f"Erro ao estabelecer conexão WebSocket: {e}")
    finally:
        try:
            await websocket.close()
            logger.info("Conexão WebSocket fechada")
        except:
            pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001) 