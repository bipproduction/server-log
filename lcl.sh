branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
case "$1" in
    -p|--push)
        tsc models_ts/*.ts --outDir ./models
        git add -A 
        git commit -m "auto push"
        git push origin $branch
    ;;
    -b|--branch)
        echo "$branch"
    ;;
    *)
        echo "
        MENU
        ------------------
        -b | --branch
        -p | --push

        contoh : $0 -b
        "
    ;;
esac


