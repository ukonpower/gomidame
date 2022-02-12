import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import { AssetManager } from '../MainVisualManager/AssetManager';
import { Background } from './Background';

import { LayerInfo } from '@ore-three-ts';
export class MainVisualWorld {

	private commonUniforms: ORE.Uniforms;
	private scene: THREE.Scene;

	private assetManager: AssetManager;
	private renderer: THREE.WebGLRenderer;

	private layerInfo: ORE.LayerInfo;
	public background: Background;

	constructor( info: LayerInfo, assetManager: AssetManager, renderer: THREE.WebGLRenderer, scene: THREE.Scene, parentUniforms: ORE.Uniforms ) {

		this.layerInfo = info;
		this.assetManager = assetManager;
		this.renderer = renderer;
		this.scene = scene;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
		} );

		this.background = new Background( this.commonUniforms );
		this.scene.add( this.background );

	}

	public resize( layerInfo: ORE.LayerInfo ) {

	}

}
