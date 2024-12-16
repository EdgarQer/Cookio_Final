//import React from 'react';
import './TileGrid.css';
import Top10 from "../assets/top-10-autumn-recipes.png";
import Desserts from "../assets/desserts.png";
import Cocktails from "../assets/coctails.png";
import Salads from "../assets/salads.png";
import Snacks from "../assets/snacks.png";
import Soups from "../assets/soups.png";
import BakingRecipes from "../assets/baking-recipes.png";

const tiles = [
	{ id: 1, image: Top10, title: 'Top 10 Autumn Recipes' },
	{ id: 2, image: Desserts, title: 'Desserts' },
	{ id: 3, image: Cocktails, title: 'Cocktails' },
	{ id: 4, image: Salads, title: 'Salads' },
	{ id: 5, image: Snacks, title: 'Snacks' },
	{ id: 6, image: Soups, title: 'Soups' },
	{ id: 7, image: BakingRecipes, title: 'The Best Baking Recipes Just for You' },
];
const linkTop10 = "https://www.bbcgoodfood.com/howto/guide/top-10-autumn-recipes";

export default function TileGrid() {
	return (
		<div className="tile-grid">
			{/* Column 1 */}
			<div className="tile-large" >
				<div
					className="tile tile--large"
					style={{ backgroundImage: `url(${tiles[0].image})` }} 
				>
					<div className="tile__text tile__text--large" onClick={linkTop10}>{tiles[0].title} </div>
				</div>
			</div>

			{/* Column 2 */}
			<div className="tile-medium">
				{[tiles[1], tiles[2]].map((tile) => (
					<div
						key={tile.id}
						className="tile tile--medium"
						style={{ backgroundImage: `url(${tile.image})` }}
					>
						<div className="tile__text tile__text--medium">{tile.title}</div>
					</div>
				))}
			</div>

			{/* Column 3 */}
			<div className="tile-small">
				{[tiles[3], tiles[4], tiles[5]].map((tile) => (
					<div
						key={tile.id}
						className="tile tile--small"
						style={{ backgroundImage: `url(${tile.image})` }}
					>
						<div className="tile__text tile__text--small">{tile.title}</div>
					</div>
				))}
			</div>

			{/* Full-width block */}
			<div className="tile-full">
				<div
					className="tile tile--full"
					style={{ backgroundImage: `url(${tiles[6].image})` }}
				>
					<div className="tile__text tile__text--full">{tiles[6].title}</div>
				</div>
			</div>
		</div>
	);
}
