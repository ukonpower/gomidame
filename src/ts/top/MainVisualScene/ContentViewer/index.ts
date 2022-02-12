import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import { BaseGL } from '@gl/BaseGL';
import EventEmitter from 'wolfy87-eventemitter';

export class ContentViewer extends EventEmitter {

	public contentRenderTarget: THREE.WebGLRenderTarget;
	public state: {
		openContent: boolean
	};

	private renderer: THREE.WebGLRenderer;
	private layerInfo: ORE.LayerInfo;

	private commonUniforms: ORE.Uniforms;
	private currentScene: BaseGL | null = null;

	constructor( renderer: THREE.WebGLRenderer, layerInfo: ORE.LayerInfo, parentUniforms?: ORE.Uniforms ) {

		super();

		let contentRenderTarget = new THREE.WebGLRenderTarget( 1, 1 );

		this.state = {
			openContent: true
		};

		this.renderer = renderer;
		this.layerInfo = layerInfo;
		this.contentRenderTarget = contentRenderTarget;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms );

		this.resize();

	}

	public open( sceneName: string ) {

		import( '@gl/' + sceneName + '/index.ts' ).then( ( e ) => {

			let Scene = e.default as ( typeof BaseGL );

			this.currentScene = new Scene( this.renderer, this.layerInfo, this.contentRenderTarget, this.commonUniforms );
			this.currentScene.onResize();

			this.state.openContent = true;

			this.emitEvent( 'loaded', [ sceneName, this.currentScene ] );

		} );

		this.emitEvent( 'loadstart', [ sceneName ] );

	}

	public close() {

		this.currentScene = null;
		this.state.openContent = false;

	}

	public update( deltaTime: number ) {

		if ( this.currentScene ) {

			this.currentScene.tick( deltaTime );

		}

	}

	public onHover( args: ORE.TouchEventArgs ) {

		if ( this.currentScene ) {

			this.currentScene.onHover( args );

		}

	}

	public onWheel( e: WheelEvent, trackpadDelta: number ) {

		if ( this.currentScene ) {

			this.currentScene.onWheel( e, trackpadDelta );

		}

	}

	public touchStart( args: ORE.TouchEventArgs ) {

		if ( this.currentScene ) {

			this.currentScene.onTouchStart( args );

		}

	}

	public touchMove( args: ORE.TouchEventArgs ) {

		if ( this.currentScene ) {

			this.currentScene.onTouchMove( args );

		}

	}

	public touchEnd( args: ORE.TouchEventArgs ) {

		if ( this.currentScene ) {

			this.currentScene.onTouchEnd( args );

		}

	}

	public resize() {

		this.contentRenderTarget.setSize( this.layerInfo.size.canvasPixelSize.x, this.layerInfo.size.canvasPixelSize.y );

		if ( this.currentScene ) {

			this.currentScene.onResize();

		}

	}

}
