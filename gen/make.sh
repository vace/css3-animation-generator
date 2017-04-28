rm -rf ./app
mkdir -p ./app/static/icon/

cp -r manifest.json ./app/
cp -r dist/*.js ./app
cp -r dist/*.css ./app
cp -r dist/*.html ./app
cp -r dist/static/*.woff ./app/static/
cp -r static/*.js ./app/static/
cp -r static/*.html ./app/static/
cp -r static/icon/*.png ./app/static/icon/

echo 'success build ./app'