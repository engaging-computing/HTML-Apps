# This simple script will run through all the files in the HTML5 directory,
# and remove any trailing white spaces

# NOTE: NEW SCRIPTS NEED THE FOLLOWING:
# chmod a+x /path/to/file/name_of_script.sh

# Go to the main directory.
cd /home/jason/Coding/ECG/Github/HTML-Apps

# ALL HTML, CSS, JS AND TEXT DOCUMENTS SEARCHED HERE
find -name '*.html' -print0 | xargs -r0 sed -e 's/[[:blank:]]\+$//' -i
find -name '*.css' -print0 | xargs -r0 sed -e 's/[[:blank:]]\+$//' -i
find -name '*.js' -print0 | xargs -r0 sed -e 's/[[:blank:]]\+$//' -i
find -name '*.txt' -print0 | xargs -r0 sed -e 's/[[:blank:]]\+$//' -i

# This is from: 
# http://unix.stackexchange.com/questions/64281/how-to-remove-trailing-whitespace-at-the-end-of-the-line-in-given-files-more-th
