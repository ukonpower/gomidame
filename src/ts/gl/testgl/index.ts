import { BaseGL } from '@gl/BaseGL';
import * as ORE from '@ore-three-ts';
import * as THREE from 'three';

export class TestGL extends BaseGL {

	constructor( renderer: THREE.WebGLRenderer, info: ORE.LayerInfo, renderTarget: THREE.WebGLRenderTarget, parentUniforms: ORE.Uniforms ) {

		super( renderer, info, renderTarget, parentUniforms );

	}

	public animate( deltaTime: number ) {
	}

	public onHover( args: ORE.TouchEventArgs ) {
	}

	public onWheel( e: WheelEvent, trackpadDelta: number ) {
	}

	public onTouchStart( args: ORE.TouchEventArgs ) {

	}

	public onTouchMove( args: ORE.TouchEventArgs ) {
	}

	public onTouchEnd( args: ORE.TouchEventArgs ) {
	}

	public onResize() {

		super.onResize();

	}

}
