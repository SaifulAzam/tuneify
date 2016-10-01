import React from 'react'
import SearchAutoCompleteSection from '../search-autocomplete-section'
import { connect } from 'react-redux'

import { autocompleteTrackSelected } from '../../actions/search-actions'

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
        <div className="autocomplete" style={{
            position: 'absolute',
            background: '#333',
            padding: '10px',
            width: '250px',
            top: '64px',
            color: '#fff',
            listStyle: 'none',


          }}>
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
              searchParams => dispatch(
                autocompleteTrackSelected(searchParams)
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
