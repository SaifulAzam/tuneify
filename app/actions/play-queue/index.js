import * as types from '../../constants/ActionTypes.js';
import { playTrack } from '../player';
import { showModal } from '../modal';
import { authenticate } from '../auth';
import prepareTrackData from '../../utils/prepare-track-data';

const appendTrackToQueue = (track, img,  dispatch) => new Promise((resolve, reject) => {
  dispatch(appendTrackToPlayQueue(track, img));
  resolve();
});

const randomIndex = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function toggleShuffle(on) {
  return {
    type: types.SHUFFLE,
    enabled: on,
  }
}

export function toggleRepeat(on) {
  return {
    type: types.REPEAT,
    enabled: on,
  }
}

export function resetPlayQueueIndex() {
  return {
    type: types.RESET_PLAY_QUEUE_INDEX,
  }
}

export function removeTrackFromQueue(index) {
  return {
    type: types.REMOVE_TRACK_FROM_PLAY_QUEUE,
    index,
  }
}

export function trashPlayQueue() {
  return {
    type: types.TRASH_PLAY_QUEUE,
  }
}


export function playQueueEnded() {
  return {
    type: types.PLAY_QUEUE_ENDED,
  }
}

export function resetPlayQueueEnded() {
  return {
    type: types.RESET_PLAY_QUEUE_ENDED,
  }
}

export function setCurrentIndex(index) {
  return {
    type: types.SET_CURRENT_INDEX,
    index,
  }
}

export function trackSelected(selectedTrackSummaryData) {
  return {
    type: types.TRACK_SELECTED,
    selectedTrackSummaryData,
  }
}

export function restartTrack() {
  return {
    type: types.RESTART_TRACK,
  }
}

export function playQueueTrackSelected(selectedTrackData, index) {
  return (dispatch, getState)  => {
    if (getState().playQueue.playQueueCurrentIndex === index) {
      dispatch(restartTrack());
    } else {
      dispatch(setCurrentIndex(index));
      const currentTrack = getState().playQueue.playQueueTracks[index];

      dispatch(trackSelected(currentTrack));
      dispatch(
        playTrack(
          selectedTrackData.name,
          selectedTrackData.artist,
        )
      );
    }
  }
}

export function appendTrackToPlayQueue(track, img) {
  const trackObj = prepareTrackData([track], img);
  return {
    type: types.APPEND_TRACK_TO_PLAY_QUEUE,
    trackObj
  }
}

export function addTrackToQueueAndPlay(track, img) {
  return (dispatch, getState) => {
    const trackObj = prepareTrackData([track], img);

    appendTrackToQueue(track, img, dispatch).then(() => {
      dispatch(
        setCurrentIndex(
          getState().playQueue.playQueueTracks.length - 1
        )
      )
      dispatch(playCurrentIndex());
    })
  }
}

export function savePlayList() {
  return (dispatch, getState) => {
    if (getState().playQueue.playQueueTracks.length) {
      dispatch(showModal('savePlaylist'))
    }
  }
}

export function createPlaylist() {
  return (dispatch, getState) => {
    if (!getState().authenticated) {
      dispatch(authenticate());
    }
    dispatch(showModal('createPlaylist'))
  }
}
export function playRandomIndex() {
  return(dispatch, getState) => {
    const playQueueLength = getState().playQueue.playQueueTracks.length;
    const randomTrackIndex = randomIndex(playQueueLength);
    dispatch(setCurrentIndex(randomTrackIndex));
  }
}

export function incrementCurrentIndex() {
  return (dispatch, getState) => {
    const playQueue = getState().playQueue;
    if (playQueue.shuffle) {
      dispatch(playRandomIndex());
    }

    else if (
        playQueue.playQueueTracks.length -1  === playQueue.playQueueCurrentIndex
      ) {
        if (playQueue.repeat) {
          // if repeat is enabled and we're on the last track
          // play the play queue from the beginning again
          dispatch(setCurrentIndex(0));
        } else {
          dispatch(playQueueEnded())
        }
    } else {
      dispatch({
        type: types.INCREMENT_CURRENT_INDEX,
      });
    }
  }
}

export function decrementCurrentIndex() {
  return (dispatch, getState) => {
    if (getState().playQueue.shuffle) {
      dispatch(playRandomIndex());
    } else {
      dispatch({
        type: types.DECREMENT_CURRENT_INDEX,
      });
    }
  }
}

export function playCurrentIndex() {
  return (dispatch, getState) => {
    const currentIndex = getState().playQueue.playQueueCurrentIndex;
    const currentTrack = getState().playQueue.playQueueTracks[currentIndex];
    dispatch(trackSelected(currentTrack));

    dispatch(
      playTrack(
        currentTrack.name,
        currentTrack.artist
      )
    );
  }
}

export function shuffle() {
  return (dispatch, getState) => {
    dispatch(toggleRepeat(false));
    dispatch(toggleShuffle(!getState().playQueue.shuffle));
  }
}

export function repeat() {
  return (dispatch, getState) => {
    dispatch(toggleShuffle(false));
    dispatch(toggleRepeat(!getState().playQueue.repeat));
  }
}

export function replaceQueueWithTracks(tracks, img) {
  const trackData = prepareTrackData(tracks, img);
  return {
    type: types.REPLACE_QUEUE_WITH_TRACKS,
    trackData,
  }
}

export function replaceQueueWithTracksAndPlay(tracks, img) {
  return (dispatch, getState)  => {
    dispatch(replaceQueueWithTracks(tracks, img));
    dispatch(resetPlayQueueIndex());
    dispatch(playCurrentIndex());
  }
}

export function appendTracksToPlayQueue(tracks, img) {
  const trackData = prepareTrackData(tracks, img);
  return {
    type: types.ADD_TRACKS_TO_PLAY_QUEUE,
    trackData,
  }
}

