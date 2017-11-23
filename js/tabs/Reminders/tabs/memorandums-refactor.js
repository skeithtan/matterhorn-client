import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import settings from "../../../settings";
import LoadingSpinner from "../../../components/loading";
import {
    SectionRow,
    SectionRowContent,
} from "../../../components/section";
import {
    Button,
} from "reactstrap";
import { MemorandumFormModal } from "../../Institutions/modals";

function fetchInstitutions(onResult) {
    graphql.query(`
    {
        institutions {
            id
            name
            latest_mou {
                id
                date_effective
                date_expiration
            }
            latest_moa {
                id
                date_effective
                date_expiration
            }
        }
    }
    `).then(onResult);
}

function fetchMemorandumDetails(id, onResult) {
    graphql.query(`
    {
        memorandum(id:${id}) {
            id
            category
            memorandum_file
            date_effective
            college_initiator
            linkages
        }
    }
    `).then(onResult);
}

class Memorandums extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <MemorandumsHead/>
                {/* MemorandumsBody */}
            </div>
        );
    }
}

class MemorandumsHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        Memorandum Reminders
                    </h4>
                </div>
                <div className="page-head-actions">

                </div>
            </div>
        );
    }
}

class MemorandumsBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

class MemorandumRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

export default Memorandums;