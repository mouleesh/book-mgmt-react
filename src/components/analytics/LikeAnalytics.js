import React, {Component} from 'react';
import {Chart} from 'primereact/chart';
import "./analytics.css";

class Analytics extends Component{
    render() {
        let bookAnalytics = {names :[],likes :[]};
        this.props.books.map((book)=>{
            bookAnalytics.names.push(book.bookName);
            bookAnalytics.likes.push(book.likes);
            return bookAnalytics;
        })
        const data = {
            labels: bookAnalytics.names,
            datasets: [
                {
                    label: 'Likes',
                    backgroundColor: '#42A5F5',
                    data: bookAnalytics.likes
                }
            ]    
        };       
        return(
            <Chart type="horizontalBar" data={data} />
        );
    }
}
export default Analytics