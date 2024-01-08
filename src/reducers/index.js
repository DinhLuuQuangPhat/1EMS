import { combineReducers } from "redux";
import ddhkh from "./ddhkh";
import phdnc from "./phdnc";
import document from "./document";
import common from "./common";
import LHCV from "./lhcv";
import PHTAM from "./phtam";
import HDXNP from "./hdxnp";
import PDKCT from "./pdkct";
import HDXDC from "./hdxdc";
import hdbhd from "./hdbhd";
import arraylist from "./arraylist";
import aprvtemp from "./aprvtemp";
import aprvinvc from "./aprvinvc";
import Account from "./account";
import Chart from "./chart";

export const reducers = combineReducers({
  ddhkh,
  phdnc,
  document,
  common,
  LHCV,
  PHTAM,
  HDXNP,
  PDKCT,
  HDXDC,
  hdbhd,
  arraylist,
  aprvtemp,
  aprvinvc,
  Account,
  Chart,
});
