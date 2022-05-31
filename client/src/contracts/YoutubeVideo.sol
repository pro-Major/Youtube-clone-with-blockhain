//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 < 0.9.0;

contract YVideo {
    uint public videoCount = 0;
    string public name = "YVideo";
    mapping(uint => Video) public videos;

    struct Video{
        uint id;
        string hash;
        string title;
        address author;
    }

    function uploadVideo(string memory _videoHash, string memory _title) public {
        //Make sure the video hash exists.
        require(bytes(_videoHash).length>0);
        //Make sure the video title exists
        require((bytes(_title).length>0));
       //Inrementing video ID.
        videoCount ++;
        //Add video to the contract 
        videos[videoCount] = Video(videoCount, _videoHash , _title , msg.sender);
    }
}