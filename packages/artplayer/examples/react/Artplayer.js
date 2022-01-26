import React from 'react';
import Artplayer from 'artplayer';

export default class ArtplayerReact extends React.Component {
    constructor(props) {
        super(props);
        this.instance = null;
        this.artRef = React.createRef();
    }

    componentDidMount() {
        const { option, getInstance } = this.props;
        this.instance = new Artplayer({
            ...option,
            container: this.artRef.current,
        });

        if (getInstance && typeof getInstance === 'function') {
            getInstance(this.instance);
        }
    }

    componentWillUnmount() {
        if (this.instance && this.instance.destroy) {
            this.instance.destroy();
        }
    }

    render() {
        const { option, getInstance, ...rest } = this.props;
        return React.createElement('div', {
            ref: this.artRef,
            ...rest,
        });
    }
}
