var React = require('react');

var Brand = React.createClass({
    render: function () {

        var h1Style = {
            color: '#1866e7',
            fontSize: '28px',
            fontWeight: '600',
            textTransform: 'uppercase',
            textAlign: 'center'
        };

        return (
            <h1 style={h1Style}>DropBox</h1>
        );
    }
});

module.exports = Brand;