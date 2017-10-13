import React, {Component} from 'react';
import '../App.css';
import * as API from '../api/API';
import ImageGridList from "../ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

class Dashboard extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired
    };

   

    componentWillMount(){
        //this.handleFileUpload()
        this.setState({
            username : this.props.username,
            images : this.props.Images

        });
    }


    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);
        payload.append('username',this.state.username);

        console.log("payload for upload");
        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    // API.getImages()
                    //     .then((data) => {
                    //         this.setState({
                    //             images: data
                    //         });
                    //     });
                }
            });

    };

    // constructor() {
    //     super();
    //     this.state = {
    //         images: []


    //     };
    // }

    componentDidMount() {
        console.log("componentDidMount function");
        console.log("I am here");
         console.log(this.state.username);
         };

    render() {
         console.log("Inside handleFileUpload :" + this.state.images);

        return (
        

            <div className="container">
    <div className="row">
        <div className="col-md-3">
            <ul className="nav nav-pills nav-stacked">
                <li className="active"><a href="#"><i className="fa fa-home fa-fw"></i>Home</a></li>
                <li><a href="http://www.jquery2dotnet.com"><i className="fa fa-list-alt fa-fw"></i>Widgets</a></li>
                <li><a href="http://www.jquery2dotnet.com"><i className="fa fa-file-o fa-fw"></i>Pages</a></li>
                <li><a href="http://www.jquery2dotnet.com"><i className="fa fa-bar-chart-o fa-fw"></i>Charts</a></li>
                <li><a href="http://www.jquery2dotnet.com"><i className="fa fa-table fa-fw"></i>Table</a></li>
                <li><a href="http://www.jquery2dotnet.com"><i className="fa fa-tasks fa-fw"></i>Forms</a></li>
                <li><a href="http://www.jquery2dotnet.com"><i className="fa fa-calendar fa-fw"></i>Calender</a></li>
                <li><a href="http://www.jquery2dotnet.com"><i className="fa fa-book fa-fw"></i>Library</a></li>
                <li><a href="http://www.jquery2dotnet.com"><i className="fa fa-pencil fa-fw"></i>Applications</a></li>
                <li><a href="http://www.jquery2dotnet.com"><i className="fa fa-cogs fa-fw"></i>Settings</a></li>
            </ul>
        </div>
        <div className="col-md-9 well">
            <div >
                <Typography
                    align={'center'}
                    type="display3"
                >
                    Dropbox
                </Typography>
              <TextField
                    className={'fileupload'}
                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />  
               {/*   <ImageGridList images={this.state.images}/>   */}
            </div>


        </div>
    </div>
</div>


            
        );
    }
}

export default Dashboard;
