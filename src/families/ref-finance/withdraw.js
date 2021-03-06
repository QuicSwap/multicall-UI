import React from 'react';
import { ArgsAccount, ArgsBig, ArgsJSON, ArgsNumber, ArgsString, ArgsError } from "../../utils/args";
import Call from "../../utils/call";
import { toGas } from "../../utils/converter";
import BaseTask from "../base";
import "./ref-finance.scss";

export default class Withdraw extends BaseTask {

    uniqueClassName = "ref-withdraw-task";
    errors = {
        ...this.baseErrors,
        addr: new ArgsError("Invalid address", value => ArgsAccount.isValid(value), !ArgsAccount.isValid(this.call.addr)),
        func: new ArgsError("Cannot be empty", value => value != ""),
        gas: new ArgsError("Amount out of bounds", value => ArgsNumber.isValid(value)),
    };

    init(json = null) {

        const actions = json?.actions?.[0];

        this.call = new Call({
            name: new ArgsString(json?.name ?? "Withdraw from Ref"),
            addr: new ArgsAccount(window?.LAYOUT?.state.addresses.multicall ?? ""),
            func: new ArgsString(actions?.func ?? "withdraw_from_ref"),
            /*args: new ArgsObject(json?.args 
                ? {
                    ref_adress: new ArgsString(json?.args.ref_adress),
                    tokens: new ArgsArray<ArgsAccount>(json?.args.tokens.map(t => new ArgsAccount(t))),
                    receiver_id: new ArgsAccount(json?.args.receiver_id),
                    withdrawl_gas: new ArgsNumber(json?.args.withdrawl_gas, 1, toGas(300), "gas"),
                    token_transfer_gas: new ArgsNumber(json?.args.token_transfer_gas, 1, toGas(300), "gas"),
                    deposit: new ArgsBig(json?.args.deposit, "1", null, "yocto")
                }
                : {
                    ref_address: new ArgsString("ref-finance-101.testnet"),
                    tokens: new ArgsArray(new ArgsAccount("nusdc.ft-fin.testnet")),
                    receiver_id: new ArgsAccount(""),
                    withdrawal_gas: new ArgsNumber(toGas(55), 1, toGas(300), "gas"),
                    token_transfer_gas: new ArgsNumber(toGas(4), 1, toGas(300), "gas"),
                    deposit: new ArgsBig("1", "1", null, "yocto")                    
                }    
            ),*/
            args: new ArgsJSON(actions?.args ? JSON.stringify(actions?.args, null, "  ") : "{\n  \"ref_address\": \"ref-finance-101.testnet\",\n  \"tokens\": [\n    \"nusdc.ft-fin.testnet\"\n  ],\n  \"receiver_id\": \"\",\n  \"withdrawal_gas\": \"55000000000000\",\n  \"token_transfer_gas\": \"4000000000000\",\n  \"deposit\": \"1\"\n}"),
            gas: new ArgsNumber(actions?.gas ?? toGas(95), 1, toGas(300), "gas"),
            depo: new ArgsBig(actions?.depo ?? "0", "0", null, "yocto")
        });

    }

    onAddressesUpdated() {

        this.call.addr.value = LAYOUT.state.addresses.multicall;
        this.errors.addr.validOrNull(this.call.addr.value);
        this.forceUpdate();

    }

}