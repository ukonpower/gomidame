import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import { AssetManager } from './AssetManager';
import { EasyRaycaster } from './EasyRaycaster';

export class MainVisualManager {

	public eRay: EasyRaycaster;
	public assetManager: AssetManager;
	public animator: ORE.Animator;

	constructor( ) {

		this.animator = new ORE.Animator();
		this.assetManager = new AssetManager();
		this.eRay = new EasyRaycaster();

	}

	public update( deltaTime: number ) {

		this.animator.update( deltaTime );

	}

}

