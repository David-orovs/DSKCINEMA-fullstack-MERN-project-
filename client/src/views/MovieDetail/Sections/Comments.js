import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {  Input, Typography, } from 'antd';
const { TextArea } = Input;
const { Title } = Typography;

// http://localhost:5000/users/add

function Comments(props) {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!user.isLoggedIn) {
            return alert('Please Log in first');
        }

        const variables = {
            content: Comment,
            writer: user.userId,
            postId: props.postId
        }
        console.log(variables)

        axios.post('http://localhost:5010/api/comment/', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    return (
        <div>
            <br />
            <Title style={{color: 'white', textTransform: 'uppercase', textAlign:'center'}}level={3} > Share your opinions about {props.movieTitle} </Title>
            <hr />
            {/* Comment Lists  */}
            {console.log(props.CommentLists)}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', color: 'white', textTransform: 'uppercase', justifyContent:'center', alignItems:'center', height:'200px'}} >
                    Be the first one who shares your thought about this movie
                </div>
            }

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <CustomButton style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</CustomButton>
                
            </form>

        </div>
    )
}

export default Comments
