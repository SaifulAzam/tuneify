import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import { 
  trashPlayQueue,
  shuffle,
  savePlayList,
  repeat,
} from '../../actions/play-queue';

export class PlayQueueTools extends React.Component {

  static PropTypes = {
    shuffle: PropTypes.bool.isRequired,
    repeat: PropTypes.bool.isRequired,
    onSavePlayList: PropTypes.func.isRequired, 
    onShuffle: PropTypes.func.isrequired, 
    onRepeat: PropTypes.func.isRequired, 
    onTrashPlayQueue: PropTypes.func.isRequired,  
  };

  render() {
    const shuffleState = this.props.shuffle ? 'on' : 'off';
    const repeatState = this.props.repeat ? 'on' : 'off';
    const shuffleClasses = classNames(
      'play-queue-tools__tool fa fa-random',
      'play-queue-tools__shuffle',
      `play-queue-tools__shuffle--${shuffleState}`,
    );
    
    const repeatClasses = classNames(
      'play-queue-tools__tool fa fa-repeat',
      'play-queue-tools__repeat',
      `play-queue-tools__repeat--${repeatState}`,
    );
    
    return (
      <ul className="play-queue-tools">
        <li 
          className="play-queue-tools__tool fa fa-save"
          onClick={this.props.onSavePlayList}
        ></li>
        <li 
          className={repeatClasses}
          onClick={this.props.onRepeat}
        ></li>
        <li 
          className={shuffleClasses}
          onClick={this.props.onShuffle}
        ></li>
        <li 
          className="play-queue-tools__tool fa fa-trash"
          onClick={this.props.onTrashPlayQueue}
        ></li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    shuffle: state.playQueue.shuffle,
    repeat: state.playQueue.repeat, 
  }
}

const mapDispatchToProps = {
    onShuffle: shuffle, 
    onRepeat: repeat, 
    onTrashPlayQueue: trashPlayQueue,
    onSavePlayList: savePlayList,
}

export default connect(
 mapStateToProps, 
 mapDispatchToProps
)(PlayQueueTools);
