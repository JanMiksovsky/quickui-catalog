#! /usr/bin/env python3.2
# Generate docs for .qui files
# Usage:
#    quidoc.py [ dir ]

import fnmatch
import json
import os
import re
import sys

def print_project_docs(dir):
    """ Output the documentation for the given project as JSON. """
    docs = project_docs(path)
    js = "/* Control member documentation generated by quidoc.py */\n"
    js += "var controlDocumentation = " + json.dumps(docs, sort_keys=True, indent=4) + ";"
    print(js)
    
def project_docs(project_dir):
    """ Return the documentation for all .qui control files in the given project tree. """
    result = {}
    for path, dirs, files in os.walk(project_dir):
        for filename in fnmatch.filter(files, "*.qui"):
            control_path = os.path.join(path, filename)
            docs = control_docs(control_path)
            if docs is not None:
                ( class_name, class_docs ) = docs
                result[ class_name ] = class_docs
    return result
    
def control_docs(control_path):
    """ Return the documentation for the control in a single QuickUI markup file.  """
    # Finds the main prototype definition.
    prog_script = re.compile("<script>\s*(\w*).prototype.extend\(\s*{(.*)}\s*\).*</script>", re.DOTALL)
    with open(control_path) as f:
        markup = f.read()
        match = prog_script.search(markup)
        if (match is not None):
            class_name = match.group(1)
            script = match.group(2)
            class_docs = docs_for_script(script)
            if class_docs != {}:
                return ( class_name, class_docs )

def docs_for_script(script):
    """ Returns docs for all members documented in the given script. """
    # Finds all properties prefixed with comments.
    prog_properties = re.compile("/\*(.*?)\*/\s*([a-zA-Z0-9][\w]+):", re.DOTALL)
    properties = prog_properties.findall(script)
    return { property_name: strip_interior_asterisks(comment)
         for (comment, property_name) in properties }

def strip_interior_asterisks(comment):
    """ Remove interior comment asterisks that come near the beginning of a line. """
    prog_comment_lines = re.compile("^\s*\*[ ]?", re.MULTILINE)
    return prog_comment_lines.sub("", comment).strip()

if ( __name__ == "__main__" ):
    if len(sys.argv) > 1:
        path = sys.argv[1]
    else:
        path = os.curdir
    print_project_docs(path)