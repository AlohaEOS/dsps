import React from "react";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

import Logo from "./logo";
import SearchFilter from "./search-filter";
import ActionsGroup from "./actions-group";

import { dspservicesActions } from "../dsp-services.actions";

const DSPServicesList = ({ dispatch, loading, cols, results, filterField, searchText, sortCol, isSearchable, window }) => {

    const sort = _col => {
        dispatch(dspservicesActions.sort(_col));
    };

    return (
            <Table responsive hover>
                <thead>
                    {isSearchable && <tr>
                        <th colSpan={(cols.length+2)}>
                            <SearchFilter cols={cols} filterField={filterField} searchText={searchText} />
                        </th>
                    </tr>}
                    <tr>
                        <th />
                        {cols.map((_col, _index) => {
                            return (
                                <th
                                    key={`th-${_index}`}
                                    onClick={() => {
                                        sort(_col);
                                    }}
                                    className={_col.class}
                                >
                                    {_col.caption} 
                                    {" "}
                                    {_col.field === sortCol.field && <React.Fragment>
                                        {_col.sort === "desc" && <FontAwesomeIcon icon={faSortDown} />} {_col.sort === "asc" && <FontAwesomeIcon icon={faSortUp} />}
                                    </React.Fragment>}
                                    {_col.field !== sortCol.field && <React.Fragment>
                                        <span className="blur"><FontAwesomeIcon icon={faSort} /></span>
                                    </React.Fragment>}
                                </th>
                            );
                        })}
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={(cols.length+2)} className="text-center">Loading...</td>
                        </tr>
                    )}
                    {!loading && results && results.length === 0 && (
                        <tr>
                            <td colSpan={(cols.length+2)} className="text-center">No record found.</td>
                        </tr>
                    )}
                    {!loading &&
                        results && results.length > 0 && 
                        results.map((_res, _index) => {
                            return (
                                <tr
                                    key={`tr-${_index}`}
                                    className={classnames({'deprecated': _res.api_endpoint === 'null'})}
                                >
                                    <td>
                                        <Logo info={_res} />
                                    </td>
                                    {cols.map((_col, index) => {
                                        return <td key={`td-${index}`} className={_col.class}>
                                            {_col.field === 'package_id' && <Button><Link to={`/package/${_res.id}`}>
                                                {`${_col.format ? _col.format(_res[_col.field]) : _res[_col.field]}`}
                                            </Link></Button>}
                                            {_col.field === 'provider' && <Button><Link to={`/provider/${_res[_col.field]}`}>
                                                {`${_col.format ? _col.format(_res[_col.field]) : _res[_col.field]}`}
                                            </Link></Button>}
                                            {_col.field !== 'package_id' && _col.field !== 'provider' && `${_col.format ? _col.format(_res[_col.field]) : _res[_col.field]}`}
                                        </td>
                                    })}
                                    <td className="text-nowrap">
                                        <ActionsGroup packageDetails={_res}/>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
    );
    
};

export default connect()(DSPServicesList);
