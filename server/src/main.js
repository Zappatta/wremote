import express from 'express';

import "babel-core/register";
import "babel-polyfill";

import * as CONFIG from './config';




import app from './modules/ExpressApp/ExpressApp';


import './endpoints/Rest';
import './endpoints/Arduino';