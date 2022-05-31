// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <=0.8.9;

// Step 1 : Model the video  --> Done
// Step 2 : Upload the video
// Step 3 : Store  the video
// Step 4: List The videos  --> Done




contract YoutubeClone {

    struct Video {
    uint256 id;
    string hash;
    string title;
    address author;
}


    uint public videoCount =0;

    mapping (uint => Video) public videos;

    event VideoUploaded(

        uint256 id,
        string hash,
        string title,
        address author
    );



    function UploadVideos(string memory _videoHash,string memory _title) public{

        // Video Hash length must be greater than zero
        require(bytes(_videoHash).length > 0,"Video Hash must be greater than zero");


        // Check the title
        require(bytes(_title).length > 0,"Title  must be greater than zero");


        // Check the User
        require(msg.sender != address(0),"Invalid User");


        // Increment the video count
        videoCount++;

        // Add the video in blockchain
        videos[videoCount]=Video(videoCount,_videoHash,_title,msg.sender);

        // trigger the event
        emit VideoUploaded (videoCount,_videoHash,_title,msg.sender);

    }

}
