import React from 'react';
import ArticleTile from './ArticleTile';
import './NewArticles.css';
import DishTile from './DishTile';
import SampleImage1 from "../assets/article1.png";
import SampleImage2 from "../assets/article2.png";
import SampleImage3 from "../assets/article3.png";

const articles = [
	{
		id: 'article-1',
		image: SampleImage1,
		title: 'Top 10 Italian Dishes',
		description: 'Discover the flavors of Italy with this list of must-try Italian dishes.',
	},
	{
		id: 'article-2',
		image: SampleImage2,
		title: 'Exploring French Cuisine',
		description: 'A deep dive into the rich and delicate flavors of French cuisine.',
	},
	{
		id: 'article-3',
		image: SampleImage3,
		title: 'Sushi: An Art and a Taste',
		description: 'Learn about the artistry and tradition behind sushi making.',
	},
];

export default function NewArticles() {
	return (
		<section className="popular-articles">
			<div className="container">
				<h2 className="popular-articles__title">New Articles</h2>
				<div className="popular-articles__tiles">
					{articles.map((article) => (
						<ArticleTile
							key={article.id}
							id={article.id}
							image={article.image}
							title={article.title}
							description={article.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
