import React from 'react'
import SearchAutoCompleteSection from '../search-autocomplete-section'
import { connect } from 'react-redux'

import { trackSelected } from '../../actions/search-actions'

class SearchAutoComplete extends React.Component {
  render() {
    const { 
      artists, 
      tracks,
      albums,
      dispatch,
    }  = this.props;

    if(artists.length || tracks.length || albums.length) {
      return (
        <div className="autocomplete">
          <SearchAutoCompleteSection 
            title="Artists" 
            data={artists}
            onSelectResult={
              artistData => {
                console.log(artistData)
              }
            }
          />
          <SearchAutoCompleteSection 
            title="Tracks" 
            data={tracks}
            onSelectResult={
              trackData => dispatch(
                trackSelected(trackData)
              )
            }
          />
          <SearchAutoCompleteSection 
            title="Albums" 
            data={albums}
            onSelectResult={
              albumData => {
                console.log(albumData)
              }
            }
          />
        </div>
      )
    } else {
      return null;
    }
  }
}

export default connect()(SearchAutoComplete)
