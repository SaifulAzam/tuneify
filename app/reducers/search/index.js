import * as types from '../../constants/ActionTypes.js'

export function currentSearch(state = '' , action) {

    switch (action.type) {
        case types.REQUEST_DATA:
            return  action.searchTerm
        case types.CLEAR_SEARCH:
            return  null;
        default: 
            return state
    }    
}

export function currentTrack(state = {}, action) {
  switch (action.type) {
    case types.TRACK_SELECTED:
      return action.selectedTrackData
    default: 
      return state
  }
}

export function currentArtistResults(state = [] , action) {
    switch (action.type) {
        case types.RECEIVE_ARTIST_DATA:
            //we always want a fresh set of results returned to the state
            var results = [];
            return results.concat(action.artists);
        case types.CLEAR_SEARCH: 
            return []

         default: 
             return state
      }
}

export function currentTrackResults(state = [] , action) {
    switch (action.type) {
        case types.RECEIVE_TRACK_DATA:
            //we always want a fresh set of results returned to the state
            var results = [];
            return results.concat(action.tracks);
        case types.CLEAR_SEARCH: 
            return []

         default: 
             return state
      }
}

export function currentAlbumResults(state = [] , action) {
    switch (action.type) {
        case types.RECEIVE_ALBUM_DATA:
            //we always want a fresh set of results returned to the state
            var results = [];

            return results.concat(action.albums);

        case types.CLEAR_SEARCH: 
 
            return []

         default: 
             return state
      }
}

export function videoData(state = [], action) {
  switch(action.type) {
    case types.RECEIVE_VIDEO_DATA:
    var results = [];
    return results.concat(action.videoData);
    default: return state
  }
}
