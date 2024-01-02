# wb353

This is the final project I handed in for CMPT 353 at the University of Sasaktchewan, in 2023. It is intended to be a forum of sorts, operating similarly to Reddit.
It could be a better, and is far from perfect, but I learned a lot and used good programming practice to create this project, with the intent of minimizing technical debt.

## How to install/start:
**Note: in order to start this software, you will need Docker Desktop installed.**
[Download for MacOS](https://docs.docker.com/desktop/install/mac-install/)
[Download for Windows](https://docs.docker.com/desktop/install/windows-install/)
1. Download this project to PC
2. Ensure the Docker App is running in background
3. Using the terminal on your PC, cd into the project directory and run command `docker compose up` (This will take a minute or two, wait until `Version: '5.7.44'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)` appears in terminal feedback, this means everything is ready)
4. In your internet browser, go to [localhost:5050](localhost:5050) and press "Initialize database"
5. Then go to [localhost:8080](localhost:8080) to use the project!

### Tools used:
- React JS
- Node JS
- MySQL
- Docker
- Tailwind CSS
- HTML

### Notable issues:
- Can like and dislike posts and comments infinitely, one user can give infinite likes or dislikes
- No backtracking button, need to refresh webpage to go "back"
- UI needs improvement, currently this project's layout is uninteresting and functional only

