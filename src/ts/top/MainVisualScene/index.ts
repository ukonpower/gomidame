import * as ORE from '@ore-three-ts';
import * as THREE from 'three';
import { RenderPipeline } from './RenderPipeline';
import { CameraController } from './CameraController';
import { MainVisualManager } from './MainVisualManager';
import { AssetManager } from './MainVisualManager/AssetManager';
import { ContentViewer } from './ContentViewer';
import { MainVisualWorld } from './MainVisualWorld';

export class MainVisualScene extends ORE.BaseLayer {

	private gManager?: MainVisualManager;
	private renderPipeline?: RenderPipeline;
	private cameraController?: CameraController;
	private contentViewer?: ContentViewer;

	private world?: MainVisualWorld;

	constructor() {

		super();

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( this.commonUniforms, {
			contentVisibility: {
				value: 0
			}
		} );

	}

	onBind( info: ORE.LayerInfo ) {

		super.onBind( info );

		this.gManager = new MainVisualManager();

		window.mainVisualManager = this.gManager;

		this.gManager.assetManager.load( { assets: [
			{ name: 'scene', path: './assets/scene/scene.glb', type: 'gltf' },
			{ name: 'garbageCol', path: './assets/scene/img/garbage_color_bake.png', type: 'tex' },
			{ name: 'garbageCanCol', path: './assets/scene/img/garbage_can_color_bake.png', type: 'tex' },
			{ name: 'wallCol', path: './assets/scene/img/wall_color_bake.png', type: 'tex' },
			{ name: 'paperCol', path: './assets/scene/img/paper_color_bake.png', type: 'tex' },
		] } );


		this.gManager.assetManager.addEventListener( 'loadMustAssets', ( e ) => {

			let gltf = ( e.target as AssetManager ).getGltf( 'scene' );

			if ( gltf ) {

				this.scene.add( gltf.scene );

			}

			this.initScene();
			this.onResize();

		} );

	}

	private initScene() {

		if ( this.renderer ) {

			this.renderPipeline = new RenderPipeline( this.renderer, this.commonUniforms );

		}

		if ( this.renderer ) {

			this.contentViewer = new ContentViewer( this.renderer, this.info, this.commonUniforms );

		}

		this.cameraController = new CameraController( this.camera, this.scene.getObjectByName( 'CameraDatas' ) );

		this.world = new MainVisualWorld( this.info, this.scene, this.commonUniforms );

		let light = new THREE.DirectionalLight();
		light.position.set( 1, 2, 1 );
		this.scene.add( light );

	}

	public animate( deltaTime: number ) {

		if ( this.cameraController ) {

			this.cameraController.update( deltaTime );

		}

		if ( this.renderPipeline && this.contentViewer ) {

			this.renderPipeline.render( this.scene, this.camera, this.contentViewer.contentRenderTarget );

		}

	}

	public onResize() {

		super.onResize();

		if ( this.cameraController ) {

			this.cameraController.resize( this.info );

		}

		if ( this.renderPipeline ) {

			this.renderPipeline.resize( this.info );

		}

	}

	public onHover( args: ORE.TouchEventArgs ) {

		if ( this.cameraController ) {

			this.cameraController.updateCursor( args.normalizedPosition );

		}

	}

	public onTouchStart( args: ORE.TouchEventArgs ) {

	}

	public onTouchMove( args: ORE.TouchEventArgs ) {

	}

	public onTouchEnd( args: ORE.TouchEventArgs ) {

	}

}
