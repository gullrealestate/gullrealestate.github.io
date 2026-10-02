{ pkgs, ... }:

{
  # Node.js and TypeScript environment
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_24;
    npm.enable = true;
  };

  # Helpful developer scripts matching package.json workflows
  scripts = {
    dev.exec = "npm run dev";
    build.exec = "npm run build";
    test.exec = "npm run test";
    coverage.exec = "npm run test:coverage";
    lint.exec = "npm run lint";
    preview.exec = "npm run preview";
  };

  enterShell = ''
    echo "===================================================="
    echo "  GULL Real Estate & Builders Development Shell"
    echo "  Node: $(node --version) | NPM: $(npm --version)"
    echo "===================================================="
    if [ ! -d "node_modules" ]; then
      echo ">> node_modules not found. Run: npm ci"
    fi
  '';
}
