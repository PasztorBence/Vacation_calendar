import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";

class UserTableItem extends Component {
    render() {
        const {profile} = this.props;

        return (
            <tr>
                <td>2019.01.01</td>
                <td>2019.01.02</td>
                <td>Formula-1</td>
                <td>elfogadva</td>
                <td>
                    <p data-placement="top" data-toggle="tooltip" title="Edit">
                        <button className="btn btn-primary btn-xs"
                                data-title="Edit"
                                data-toggle="modal"
                                data-target="#edit"
                        >
                           Módosítás
                        </button>
                    </p>
                </td>
                <td>
                    <p data-placement="top"
                       data-toggle="tooltip"
                       title="Delete">
                        <button className="btn btn-danger btn-xs"
                                data-title="Delete"
                                data-toggle="modal"
                                data-target="#delete"
                        >
                            Törlés
                        </button>
                    </p>
                </td>
            </tr>
        )
    }
}

export default UserTableItem;