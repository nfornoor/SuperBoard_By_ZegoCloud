import React, { useEffect, useState } from "react";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import Tools from "./Tools";
function App() {
  const appID = 623909558;
  const userID = "Noor";
  const roomID = "room-001";
  const userName = "Noor";
  const [currentTool, setCurrentTool] = useState(null);

  const token =
    "04AAAAAGlf8yQADDR4QFGNBqU2cl9kkQCtWitctW7z2mDpCmWTbnbhOPZi1Q959SbXaRsBY7O/dDU5ix65qCTNxox1qIKvK+VQbWArFQ4o+JodzyEtfM3CcghFfes4DKQBPsbrT3RKLw2gJrBYVbhZc0QzAEThktEDSBiSREjvC+kqMehh2dr4PMBtxexVHXyYQA3I1IYg4o7XXiikeUy2eUc/VmaYE1DD7H8SYWm1709WTL+azHsDndeMJ2iS657ouAXSD+YB";
  const server = "wss://webliveroom623909558-api.coolzcloud.com/ws";
  const zg = new ZegoExpressEngine(appID, server);
  const zegoSuperBoard = ZegoSuperBoardManager.getInstance();
  const initSuperBoard = async () => {
    await zegoSuperBoard.init(zg, {
      parentDomID: "parentDomID", // D of the parent container to be mounted to.
      appID, // The AppID you get.
      userID, // User-defined ID
      token,
      // The Token you get that used for validating the user identity.
    });

    await zg.loginRoom(
      roomID,
      token,
      { userID, userName },
      { userUpdate: true }
    );

    setCurrentTool(zegoSuperBoard.getToolType());

    await zegoSuperBoard.createWhiteboardView({
      name: "Virtual Board", // Whiteboard name
      perPageWidth: 1600, // Width of each whiteboard page
      perPageHeight: 900, // Height of each whiteboard page
      pageCount: 1, // Page count of a whiteboard
    });
  };
  useEffect(() => {
    if (zegoSuperBoard) {
      initSuperBoard()
    }
  }, [zegoSuperBoard])

  return (
    <div className="h-[100vh] bg-black w-full">
      <div id="parentDomID" className="w-full h-full"></div>
      <Tools
        currentTool={currentTool}
        onClick={(tool) => {
          zegoSuperBoard.setToolType(tool.type);
          setCurrentTool(tool.type);
        }}
      />
    </div>
  );
}

export default App;
