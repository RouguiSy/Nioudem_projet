if [ -z "$1" ]; then
    echo "Usage : ./create-page.sh nomPage"
    exit 1
fi

PAGE_NAME=$1
PAGE_DIR="js/pages/$PAGE_NAME"
JS_FILE="$PAGE_DIR/$PAGE_NAME.js"

mkdir -p "$PAGE_DIR"


cat > "$JS_FILE" << EOF
export function ${PAGE_NAME}() {
    return \`
        <h1>Bienvenue sur la page ${PAGE_NAME^}</h1>
    \`;
}
EOF

echo " Page créée : $JS_FILE"