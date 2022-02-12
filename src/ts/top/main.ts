import barba, { IView } from '@barba/core';
import * as ORE from '@ore-three-ts';
import { GLList } from '../types/gl';
import { MainVisualScene } from './MainVisualScene';
import { MainVisualManager } from './MainVisualScene/MainVisualManager';

declare global {
	interface Window {
		mainVisualManager: MainVisualManager;
		mainVisualRenderer: THREE.WebGLRenderer,
		isSP: boolean;
	}
}

class APP {

	private scene: MainVisualScene;
	private controller: ORE.Controller;

	constructor() {

		/*-------------------------------
			ORE
		-------------------------------*/

		let canvas = document.querySelector( "#canvas" ) as HTMLCanvasElement;
		this.controller = new ORE.Controller();

		this.scene = new MainVisualScene();
		this.controller.addLayer( this.scene, {
			name: 'SceneController',
			canvas: canvas,
		} );

		/*------------------------
			Barba
		------------------------*/

		let glList = require( '@gl/gl.json' ) as GLList;

		let views: IView[] = [];

		views.push( {
			namespace: 'main',
			beforeLeave: () => {

			},
			beforeEnter: async ( data ) => {
			}
		},
		{
			namespace: 'about',
			beforeLeave: () => {
			},
			beforeEnter: async ( data ) => {
			}
		} );

		/*------------------------
			Open GLs
		------------------------*/

		glList.forEach( item => {

			views.push( {
				namespace: item.title,
				beforeLeave: () => {
				},
				beforeEnter: async ( data ) => {
				}
			} );

		} );

		barba.init( {
			transitions: [
				{
					leave: () => {
					},
					enter: ( data ) => {
					},
					afterEnter: () => {
					}
				}
			],
			views: views
		} );

	}

}

window.addEventListener( 'DOMContentLoaded', ()=>{

	let app = new APP();

} );
