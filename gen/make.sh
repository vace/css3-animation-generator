rm -rf ./app
mkdir -p ./app/static/icon/

cp -r manifest.json ./app/
cp -r dist/*.js ./app
cp -r dist/*.css ./app
cp -r dist/*.html ./app
# cp -r dist/static/*.woff ./app/static/
cp -r dist/assets ./app
cp -r static/*.js ./app/static/
cp -r static/*.html ./app/static/
cp -r static/icon/*.png ./app/static/icon/
cp -r src/languages ./app/_locales
cp -r static/codemirror5.25.0 ./app/static/codemirror5.25.0
echo 'success build ./app'