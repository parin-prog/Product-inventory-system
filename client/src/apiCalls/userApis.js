import { publicRequest } from "../../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";

export const login = async (dispatch, user)=>{
	
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
		const { _doc, token } = res.data;
		const userData = { _doc, token };
	    dispatch(loginSuccess(userData));
	}catch(err) {
		dispatch(loginFailure());
	}
}

export const register = async (dispatch, user)=>{
	dispatch(loginStart());
	try {
		await publicRequest.post("/auth/register", user);
		const res = await publicRequest.post("/auth/login", user);
		const { _doc, token } = res.data;
		const userData = { _doc, token};
		dispatch(loginSuccess(userData));
	}catch(err) {
		dispatch(loginFailure());
	}
}
