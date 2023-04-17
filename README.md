# Introduction
This PlayLeap App in react native (iOS, Android).

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
 iOS:- Yarn ios
 Android:- Yarn android

# Contribute
Remember Points:
    1. We Don't need to use onScroll attribute in Flatlist/VirtualList/SwiperList and if we are using then make sure to append performance settings (removeClippedSubviews, initialNumToRender, maxToRenderPerBatch, windowSize, updateCellsBatchingPeriod).

        # Why we need to do above point
         - Because we were using onScroll attribute inside swiperflat list and found crash in realase mode (When we were swipping a video list fast from top to bottom and bottom to top) with iPhone 13 / 13 Pro.
         - This issue was created in Version 1.0 build number 103 and was solved in 104.
         - Issue Branch URL : https://github.com/redmatch/leap/commit/0da00a23b46d50e94033490f3896a54531325462#diff-48cf64ad5cf4cb6e974f910f6fcac10a65674c1a7f0183e557c2697b997ca0e3
         - Issue resolve branch URL: https://github.com/redmatch/leap/commit/b0ca2354945e4fd0df66929d438d587bc9c8eb7e#diff-48cf64ad5cf4cb6e974f910f6fcac10a65674c1a7f0183e557c2697b997ca0e3