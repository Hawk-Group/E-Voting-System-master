import Web3 from 'web3';
import Evoting from '../contracts/Evoting.json';

let web3;
let contract;

const loadContract = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("No web3 provider found. Please install MetaMask.");
        }
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request account access
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Evoting.networks[networkId];
        contract = new web3.eth.Contract(Evoting.abi, deployedNetwork && deployedNetwork.address);
    } catch (error) {
        console.error("Error loading contract:", error);
        throw error; // Re-throw to propagate the error
    }
};

export const registerUser = (user) => async (dispatch) => {
    try {
        await loadContract();
        const accounts = await web3.eth.getAccounts();
        const { name, age, aadhar, wallet, userType } = user;

        if (userType === 'voter') {
            await contract.methods.registerVoter(wallet).send({ from: accounts[0] });
        }

        dispatch({
            type: 'REGISTER_USER',
            payload: { name, age, aadhar, wallet, userType },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        // Dispatch an error action if needed
    }
};

export const loginUser = (user) => {
    return {
        type: 'LOGIN_USER',
        payload: user,
    };
};

export const fetchCandidates = () => async (dispatch) => {
    try {
        await loadContract();
        const candidates = await contract.methods.getCandidates().call();

        dispatch({
            type: 'FETCH_CANDIDATES',
            payload: candidates,
        });
    } catch (error) {
        console.error("Error fetching candidates:", error);
        // Dispatch an error action if needed
    }
};

export const castVote = (candidateId) => async (dispatch) => {
    try {
        await loadContract();
        const accounts = await web3.eth.getAccounts();

        await contract.methods.vote(candidateId).send({ from: accounts[0] });

        // Optionally, wait for transaction confirmation:
        // .once('receipt', (receipt) => {
        //     console.log('Vote transaction confirmed:', receipt);
        //     // Dispatch success action
        // })
        // .on('error', (error) => {
        //     console.error('Vote transaction error:', error);
        //     // Dispatch error action
        // });

    } catch (error) {
        console.error("Error casting vote:", error);
        // Dispatch an error action if needed
    }
};

export const fetchResults = () => async (dispatch) => {
    try {
        await loadContract();
        const results = await contract.methods.getResults().call();

        dispatch({
            type: 'FETCH_RESULTS',
            payload: results,
        });
    } catch (error) {
        console.error("Error fetching results:", error);
        // Dispatch an error action if needed
    }
};