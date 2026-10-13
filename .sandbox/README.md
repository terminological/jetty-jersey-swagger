# .sandbox

Configuration for scoder, which runs tools in a bubblewrap sandbox.

This whole directory is bound **read-only** inside the sandbox, so a tool
running in there can read these files but cannot change what it is allowed to
do. Edit them from outside.

- `readonly`  — paths kept read-only inside the sandbox
- `readwrite` — `$HOME` directories opened read-write
- `ports`     — localhost ports forwarded into the sandbox
- `env`       — host environment variables passed into the sandbox, by name

scoder creates this directory the first time it runs in a project, copying
in each file from `~/.config/scoder/` that the project does not already
have (and creating `~/.config/scoder/` from its built-in defaults first).
Edit `~/.config/scoder/` to change what new projects start with; edit these
files to change this project. Each file documents itself in its own
comments.
