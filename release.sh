VERSION=$1

# cd android
# fastlane version version:$VERSION
# cd ..
cd ios
fastlane version version:$VERSION
cd ..

git add .
git commit -m 'update version'
git push origin fastlane

git tag -a v$VERSION -m 'add verstion tag' -f
git push origin v$VERSION -f