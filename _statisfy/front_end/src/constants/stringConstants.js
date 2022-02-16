export const instDataPage = [
    ["1", "Set a delimeter for the dataset. Delimeter divides the data set into partitions of data"],
    ["2", "Upload a dataset in comma-separated values (CSV) format and review the dataset"],
    ["3", "Clean the dataset by removing rows of data with missing values, by replacing null values with the average value, or by removing rows that contains outlier data"],
    
];

export const tooltipDelimiter = "A delimiter determines the partitioning of every data per column in a dataset. It is an indicator of separation between data points. The default delimiter for CSV files is a comma ','.";

export const tooltipDataset = "A dataset is a collection of interrelated information that can be analyzed by means of data analysis, statistics, and machine learning. The system only accepts comma-separated values (CSV) as file extension for datasets for uniformity.";

export const tooltipDataCleaning = "Remove or change null variables or data outliers. Only the cleaned dataset will be saved";

export const stepsString = [
    'Name your research.',
    'Upload and configure your dataset.',
    'Verify your choices.'
];

export const studyStepsString = [
    'Name your Study.',
    'Select appropriate tool',
    'Select columns of data to be processed.'
];

export const passwordRequirement = "Password should be at least eight characters, has at least one uppercase letter, one lowercase letter, one number and one special character.";

export const status500 = "Request from server returned an error status 500. The server might be offline or down, please try again later.";

export const researchSuccessTitle = "Research created successfully!";
export const researchSuccess = "You may now view and customize your research. Proceed by creating a study, which selects certain colums for you to analyze by our preset statistical or machine learning methods.";

export const variableTooltip = {
    'R Coefficient': 'R Coefficient determines the strength of linear relationship of the two variables. The closer it is to 1.0, the higher the strength of the relationship is. If the coefficient is positive that means the relationship has an upward trend and if the coefficient is negative that means the relationship has a downward trend.',
    'P-value': 'P value is a measure of the probability that an observed difference could have occurred just by random chance.',
    'SSxy': 'Sum of Squares of X and Y variables.',
    'SSx': 'Sum of Squares of X variable.',
    'SSy': 'Sum of Squares of Y variable',
    'X Mean': 'The mean or average value of the variable X.',
    'Y Mean': 'The mean or average value of the variable Y.'
};

export const studySuccessTitle = "Study Calculation Successful!";
export const studySuccess = "Study successfuly created! Check the results of your study under the studies tab and proceed to results.";

export const userUpdateSuccessTitle = "Information Saved!"
export const userUpdateSuccess = "Profile details successfully edited!"

export const iqrTooltip = "Interquartile range (IQR) is a measure of variability based on the statistical dispersion of the data. IQR can be used to identify outliers by specifying the upper and lower boundaries of your data based on their quartile ranges and datapoints that are outside that range is considered to be outliers.";