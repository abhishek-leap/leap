import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getCurrentISOFormatedDate} from '../utils/dateHelpers';
import {loadFeedbyID, loadFeeds} from '../apis';
import {BLOCK_ACTION, FEEDS_TO_FETCH} from '../constants';
import {getData} from '../utils/helper';

export const useFeeds = ({
  source = 'home',
  id,
  refetchOnMount = true,
  refetchOnWindowFocus = false,
}) => {
  const q = useMemo(() => {
    let query = {};
    switch (source) {
      case 'skill':
        query.skillIds = id;
        break;
      case 'hashtag':
        query.hashTags = id;
        break;
      case 'user':
        query.userId = id;
        break;
      default:
        query.smartSort = true;
    }
    return query;
  }, [source, id]);
  const {
    data,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isFetchedAfterMount,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['feeds', source, JSON.stringify(q)],
    queryFn: ({pageParam}) =>
      loadFeeds({
        filter: {offset: pageParam || 0, limit: FEEDS_TO_FETCH},
        q,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage?.meta?.total || 0;
      const newOffset = allPages?.reduce((len, item) => {
        if (item?.feeds) {
          len +=
            item.feeds.length > FEEDS_TO_FETCH
              ? FEEDS_TO_FETCH
              : item.feeds.length;
        }
        return len;
      }, 0);
      return newOffset < total ? newOffset : undefined;
    },
    refetchOnMount,
    refetchOnWindowFocus,
    enabled: source == 'home' || !!id,
    onError: error => console.log(`usePosts ${source} ${id} error :`, error),
    staleTime: 1000 * 60 * 60,
  });

  const mergedPosts =
    data?.pages?.reduce((arr, item) => [...arr, ...(item.feeds || [])], []) ||
    [];

  return {
    data: mergedPosts,
    meta: data?.pages?.[0]?.meta,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isFetchedAfterMount,
    isRefetching,
  };
};

export const useFeed = () => {
  const {
    feedPlayerModalId,
    feedSource,
    feedSlug,
    feedCommentsModalId,
    feedIdMenuOptions,
  } = useSelector(({feeds}) => feeds);

  const {data} = useQuery({
    queryKey: ['feed', feedPlayerModalId],
    queryFn: () => loadFeedbyID({feedId: feedPlayerModalId}),
    enabled: !!feedPlayerModalId && !feedSource && !feedSlug,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: error =>
      console.log(`useFeed ${feedPlayerModalId} error :`, error),
    staleTime: 1000 * 60 * 60,
  });
  const {data: feedsList} = useFeeds({
    source: feedSource || 'home',
    id: feedSlug,
    refetchOnMount: false,
  });

  let cachedData;
  if (
    !feedPlayerModalId ||
    (!feedPlayerModalId && feedCommentsModalId) ||
    (!feedPlayerModalId && feedIdMenuOptions) ||
    (feedSource && feedSlug)
  ) {
    feedsList?.forEach(feed => {
      if (
        feed?.id ===
        (feedPlayerModalId || feedCommentsModalId || feedIdMenuOptions)
      ) {
        cachedData = feed;
      }
    });
  }

  return {data: cachedData || data};
};

export const useFeedActionHandlers = () => {
  const {feedPlayerModalId, feedSource, feedSlug, feedCommentsModalId} =
    useSelector(({feeds}) => feeds);
  const queryClient = useQueryClient();
  const incrementLikes = (id, reactions, updateCount = true) => {
    if (feedPlayerModalId && !feedSource && !feedSlug) {
      queryClient.setQueryData(['feed', id], oldData => {
        if (oldData) {
          const count = oldData.stats?.reactions || 0;
          return {
            ...oldData,
            stats: {
              ...oldData.stats,
              reactions: updateCount ? count + 1 : count,
            },
            userReactions: reactions ? [reactions] : [{id: 'id'}],
          };
        }
        return oldData;
      });
    }
    queryClient.setQueriesData({queryKey: ['feeds']}, oldData => {
      if (oldData) {
        const pages = oldData?.pages?.map(page => {
          const feeds = [
            ...(page?.feeds || []).map(feed => {
              if (feed?.id === id) {
                const count = feed.stats?.reactions || 0;
                return {
                  ...feed,
                  stats: {
                    ...feed.stats,
                    reactions: updateCount ? count + 1 : count,
                  },
                  userReactions: reactions ? [reactions] : [{id: 'id'}],
                };
              }
              return feed;
            }),
          ];
          return {...page, feeds};
        });
        return {...oldData, pages};
      }
      return oldData;
    });
  };

  const decrementLikes = id => {
    if (feedPlayerModalId && !feedSource && !feedSlug) {
      queryClient.setQueryData(['feed', id], oldData => {
        if (oldData) {
          const count = oldData.stats?.reactions || 0;
          return {
            ...oldData,
            stats: {...oldData.stats, reactions: count > 0 ? count - 1 : 0},
            userReactions: [],
          };
        }
        return oldData;
      });
    }
    queryClient.setQueriesData({queryKey: ['feeds']}, oldData => {
      if (oldData) {
        const pages = oldData?.pages?.map(page => {
          const feeds = [
            ...(page?.feeds || []).map(feed => {
              if (feed?.id === id) {
                const count = feed.stats?.reactions || 0;
                return {
                  ...feed,
                  stats: {
                    ...feed.stats,
                    reactions: count > 0 ? count - 1 : 0,
                  },
                  userReactions: [],
                };
              }
              return feed;
            }),
          ];
          return {...page, feeds};
        });
        return {...oldData, pages};
      }
      return oldData;
    });
  };

  const updateComments = comment => {
    if (feedPlayerModalId && feedCommentsModalId && !feedSource && !feedSlug) {
      queryClient.setQueryData(['feed', feedCommentsModalId], oldData => {
        if (oldData) {
          const count = oldData.stats?.comments || 0;
          const comments =
            comment?.level === 0
              ? [...(oldData.comments || []), comment]
              : [
                  ...(oldData.comments || []).map(item => {
                    if (comment.commentId === item.id) {
                      return {
                        ...item,
                        replies: [...(item.replies || []), comment],
                      };
                    }
                    return item;
                  }),
                ];
          return {
            ...oldData,
            stats: {
              ...oldData.stats,
              comments: count + 1,
            },
            comments,
          };
        }
        return oldData;
      });
    }
    queryClient.setQueriesData({queryKey: ['feeds']}, oldData => {
      if (oldData) {
        const pages = oldData?.pages?.map(page => {
          const feeds = [
            ...(page?.feeds || []).map(feed => {
              if (feed?.id === feedCommentsModalId) {
                const count = feed.stats?.comments || 0;
                const comments =
                  comment?.level === 0
                    ? [...(feed.comments || []), comment]
                    : [
                        ...(feed.comments || []).map(item => {
                          if (comment.commentId === item.id) {
                            return {
                              ...item,
                              replies: [...(item.replies || []), comment],
                            };
                          }
                          return item;
                        }),
                      ];

                return {
                  ...feed,
                  stats: {
                    ...feed.stats,
                    comments: count + 1,
                  },
                  comments,
                };
              }
              return feed;
            }),
          ];
          return {...page, feeds};
        });
        return {...oldData, pages};
      }
      return oldData;
    });
  };

  const updatePost = (id, data = {}) => {
    if (feedPlayerModalId && !feedSource && !feedSlug) {
      queryClient.setQueryData(['feed', id], oldData => {
        if (oldData) {
          return {
            ...oldData,
            ...data,
          };
        }
        return oldData;
      });
    }
    queryClient.setQueriesData({queryKey: ['feeds']}, oldData => {
      if (oldData) {
        const pages = oldData?.pages?.map(page => {
          const feeds = [
            ...(page?.feeds || []).map(feed => {
              if (feed?.id === id) {
                return {
                  ...feed,
                  ...data,
                };
              }
              return feed;
            }),
          ];
          return {...page, feeds};
        });
        return {...oldData, pages};
      }
      return oldData;
    });
  };

  const addPostToList = (data, source = 'home', slug) => {
    const q = () => {
      let query = {};
      switch (source) {
        case 'skill':
          query.skillIds = slug;
          break;
        case 'hashtag':
          query.hashTags = slug;
          break;
        case 'user':
          query.userId = slug;
          break;
        default:
          query.smartSort = true;
      }
      return query;
    };
    queryClient.setQueryData(
      {queryKey: ['feeds', source, JSON.stringify(q())]},
      oldData => {
        if (oldData) {
          const pages = oldData?.pages?.map((page, idx) => {
            let feeds = [...(page?.feeds || []).filter(e => e.id !== data.id)];
            if (idx === 0) {
              feeds = [data, ...feeds];
            }

            return {...page, feeds};
          });
          return {...oldData, pages};
        }
        return oldData;
      },
    );
  };
  const blockUnblockPost = (id, action, isPowerUser) => {
    if (feedPlayerModalId && !feedSource && !feedSlug) {
      queryClient.setQueryData(['feed', id], oldData => {
        if (oldData) {
          const communityCount = oldData.communityBlockersCount || 0;
          return {
            ...oldData,
            blockedAt:
              action === BLOCK_ACTION ? getCurrentISOFormatedDate() : null,
            communityBlockersCount: isPowerUser
              ? communityCount
              : action === BLOCK_ACTION
              ? communityCount + 1
              : communityCount > 0
              ? communityCount - 1
              : 0,
            blockPowerUserId:
              action === BLOCK_ACTION && isPowerUser
                ? getData('user_id')
                : null,
          };
        }
        return oldData;
      });
    }
    queryClient.setQueriesData({queryKey: ['feeds']}, oldData => {
      if (oldData) {
        const pages = oldData?.pages?.map(page => {
          const feeds = [
            ...(page?.feeds || []).map(feed => {
              if (feed?.id === id) {
                const communityCount = feed.communityBlockersCount || 0;
                return {
                  ...feed,
                  blockedAt:
                    action === BLOCK_ACTION
                      ? getCurrentISOFormatedDate()
                      : null,
                  communityBlockersCount: isPowerUser
                    ? communityCount
                    : action === BLOCK_ACTION
                    ? communityCount + 1
                    : communityCount > 0
                    ? communityCount - 1
                    : 0,
                  blockPowerUserId:
                    action === BLOCK_ACTION && isPowerUser
                      ? getData('user_id')
                      : null,
                };
              }
              return feed;
            }),
          ];
          return {...page, feeds};
        });
        return {...oldData, pages};
      }
      return oldData;
    });
  };

  const removePost = id => {
    queryClient.setQueriesData({queryKey: ['feeds']}, oldData => {
      if (oldData) {
        const pages = oldData?.pages?.map(page => {
          const feeds = [
            ...(page?.feeds || []).filter(feed => feed?.id !== id),
          ];
          return {...page, feeds};
        });
        return {...oldData, pages};
      }
      return oldData;
    });
  };

  return {
    addPostToList,
    incrementLikes,
    decrementLikes,
    updateComments,
    blockUnblockPost,
    updatePost,
    removePost,
  };
};
