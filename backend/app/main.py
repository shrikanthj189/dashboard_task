from fastapi import FastAPI
from app.routes import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow all origins (for development only)
origins = ["*"]

# For Production:
# origins = ["http://localhost:3000", "https://your-frontend.com"]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],              # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],              # Authorization, Content-Type, etc.
)


app.include_router(dashboard_router)
