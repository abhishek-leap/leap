package io.playleap.rnative;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import io.playleap.videoeditorsdk.createcontent.filtercustomui.CameraFilterActivity;
import io.playleap.videoeditorsdk.utils.ConstantVariables;

public class VideoEditorJavaModule extends ReactContextBaseJavaModule {
    public class VideoEditorResultListener implements ActivityEventListener {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            Log.e("Test", " reqCode $requestCode , resultCode $resultCode , data $data");
            if (requestCode == EXPORT_REQUEST_CODE) {
                switch (resultCode){
                    case Activity.RESULT_OK : {
                        String  resultUri = data.getStringExtra("uri");
                        if (resultUri == null) {
                            exportResultPromise.resolve(null);
                        }else {
                            Log.e("Tag", "recorded uri: $it");
                            exportResultPromise.resolve(resultUri);
                        }

                    }
                    case  Activity.RESULT_CANCELED: {
                        exportResultPromise.resolve(null);
                    }
                }
                exportResultPromise = null;
            }
        }

        @Override
        public void onNewIntent(Intent intent) {

        }
    }
    VideoEditorResultListener videoEditorResultListener = new VideoEditorResultListener();

    VideoEditorJavaModule(ReactApplicationContext context) {
        super(context);
        getReactApplicationContext().addActivityEventListener(videoEditorResultListener);
    }

    @NonNull
    @Override
    public String getName() {
        return "VideoEditorModule";
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
    }
    private  Promise exportResultPromise = null;
    @ReactMethod
    public void openVideoEditor(String token, String lensGroups, Boolean shouldResume , Promise inputPromise) {

        Activity hostActivity = getCurrentActivity();
        if (hostActivity == null) {
            inputPromise.resolve(null);
            return;
        } else {
            this.exportResultPromise = inputPromise;
            SharedPreferences preferences =
                    getCurrentActivity().getSharedPreferences(
                            getCurrentActivity().getString(R.string.app_name),
                    Context.MODE_PRIVATE
                );
            Log.e("VideoEditor", " APP_ACCESS_TOKEN: $token");
            Log.e("VideoEditor", " Lens Groups: $lensGroups") ;
            SharedPreferences.Editor editor= preferences.edit();
            editor.putString(ConstantVariables.APP_ACCESS_TOKEN, token);
            editor.putBoolean(ConstantVariables.IS_OPEN_DRAFT, shouldResume );
            if(lensGroups!=null&& !lensGroups.isEmpty()){
                editor.putString(
                        ConstantVariables.LENSES_GROUPID_LIST,
                        lensGroups
                );
            }
            editor.apply();

            Intent intent = new Intent(hostActivity, CameraFilterActivity.class);

            //Intent intent = Intent(hostActivity, CameraFilterActivity.class);
            /*  val intent = VideoCreationActivity.startFromCamera(
                  hostActivity,
                  //setup video uri to utilize it with Picture in Picture mode
                  Uri.EMPTY,
                  // setup data that will be acceptable during export flow
                  null,
                  // set TrackData object if you open VideoCreationActivity with preselected music track
                  null
              )*/
            hostActivity.startActivityForResult(intent, EXPORT_REQUEST_CODE);
        }

    }

    private static Integer EXPORT_REQUEST_CODE = 1111;
    private static String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static String E_VIDEO_EDITOR_CANCELLED = "E_VIDEO_EDITOR_CANCELLED";
    private static String E_EXPORTED_VIDEO_NOT_FOUND = "E_EXPORTED_VIDEO_NOT_FOUND";
}
