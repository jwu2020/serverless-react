import React, {forwardRef, useEffect, useState} from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {
    ArrowDownward,
    ChevronLeft,
    ChevronRight,
    FirstPage,
    LastPage,
    Search,
    ViewColumn
} from "@material-ui/icons";
import Loader from "react-loader-spinner";


const style = {
    top:'50%',
    position:'absolute',
    left:'50%'
};


function VotePanel() {
    const [isLoading, setLoading] = useState(true);
    const [submissionData, setSubmissionData] = useState([]);

    // Get submission data
    useEffect(() => {
        const fetchData = async () => {
            const api_url = process.env.REACT_APP_API_GATEWAY_BASE_URL + "/submission"
            console.log('api url = ' + api_url)
            const options = {
                url: api_url,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                params: {
                    'sql_query':'select * from submissions',
                    'table':'submissions'
                }
            };
            await axios(options)
                .then(response => {
                    console.log(response);

                    if (response.status === 200) {
                        setSubmissionData(response.data);
                        console.log(response.data)
                        setLoading(false);
                    } else {
                        return []
                    }
                });
        };
        fetchData();
    }, []);

    console.log('Test', process.env.REACT_APP_API_GATEWAY_BASE_URL, process.env);

    if (isLoading) {

        return (
            <Loader
                style={style}
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
            />
        );
    }

    console.log(submissionData)

    if (submissionData === []) {
        return (
            <h1>
                We are currently under construction!
            </h1>
        );
    }


    const headers = [
        { field: 'name', title: 'Snack' },
        { field: 'upvote', title: 'Up Votes'},
        { field: 'downvote', title: 'Down Votes' },
        { field: 'submitted_by', title: 'Submitted By' }

    ]


    const tableIcons = {
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };


    return (
        <MaterialTable
            icons={tableIcons}
            title="Submitted Snacks"
            columns={headers}
            data={submissionData}
            options={{
                sorting: true
            }}
        />
    )
}


export default VotePanel;

