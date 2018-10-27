import React from 'react'

class Reviews extends React.Component{

    render(){
        const { reviews } = this.props
        if(!reviews.length){
            return <div>There's no reviews for this product. Be the first one to write one!</div>
        }
        return (
            <div>
                <h4>Reviews</h4>
                <ul>
                    {reviews.map(review => {
                        return (
                            <div key={review.id}>
                                <span>Rating: {review.rating}</span>
                                <p>{review.text}</p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }

}

export default Reviews