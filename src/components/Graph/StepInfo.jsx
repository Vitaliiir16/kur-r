import React from 'react';

const StepInfo = ({ edges }) => {
    return (
        <div className="step-info">
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Від</th>
                        <th>До</th>
                        <th>Вага</th>
                    </tr>
                </thead>
                <tbody>
                    {edges.map((edge, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{edge.from}</td>
                            <td>{edge.to}</td>
                            <td>{edge.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StepInfo;
