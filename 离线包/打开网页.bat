@echo off
title 十个勤天·百科全书
cd /d "%~dp0"

echo.
echo   🌾🌾🌾  十个勤天 · 百科全书  🌾🌾🌾
echo.
echo   正在启动本地服务器...
echo.

REM 尝试 Python3
where python3 >nul 2>&1
if %errorlevel% equ 0 (
    start http://localhost:8765/
    python3 -m http.server 8765
    goto :end
)

REM 尝试 Python
where python >nul 2>&1
if %errorlevel% equ 0 (
    start http://localhost:8765/
    python -m http.server 8765
    goto :end
)

echo.
echo   ❌ 没有找到 Python，请安装 Python 后再试：
echo   https://www.python.org/downloads/
echo   （安装时请勾选 "Add Python to PATH"）
echo.
pause
:end
