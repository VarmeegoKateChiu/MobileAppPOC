## Build debug apk

Build debug apk for development/ testing

```bash
#For Window
# Step 1:  write bundle output to assets destination (projectPath/android/app/src/main/assets/index.android.bundle)
npm run bundle-android

# Step 2 : Go to android directory:
cd android

# Step 3: Now in this android folder, run this command
gradlew assembleDebug

#you'll find the apk file in the following path:
yourProject/android/app/build/outputs/apk/debug/app-debug.apk
```