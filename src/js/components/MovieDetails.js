import React from 'react';

export default class MovieDetails extends React.Component {

    render() {
        const movie = this.props.mediaItem;
        return (
            <div>
                <div className="modal fade" id={movie._id} tabIndex="-1" role="dialog" aria-labelledby={movie.processedFileName}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id={movie.processedFileName}>{movie.imdbTitle}  </h4>
                        </div>
                        <div className="modal-body">
                            {movie.processedFileName}
                            <img src={movie.poster} alt={movie.processedFileName} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        );
    }
}