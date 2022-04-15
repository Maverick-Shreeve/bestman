import os
from typing import List
import openai
import argparse
import re

MAX_INPUT_LENGTH = 32


def main():
    parser = argparse.ArgumentParser()   #argparse lets me test the API by typing - python bestman.py -i "any input"
    parser.add_argument("--input", "-i", type=str, required=True)  #also make sure to change directory to app for testing// cd app
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}") #trying out f strings this line prints out what i type in
    if validate_length(user_input):
        generate_branding_snippet(user_input)
        generate_keywords(user_input)
    else:
        raise ValueError(
            f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}")


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


def generate_keywords(prompt: str) -> List[str]:
    # Load API key from an environment variable 
    openai.api_key = ("OPENAI_API_KEY")
    enriched_prompt = f"Generate related branding keywords for {prompt}: "
    print(enriched_prompt)

    response = openai.Completion.create(
        engine="text-davinci-002", prompt=enriched_prompt, max_tokens=32 # the davinci text is from the openAI website
    )

    # Extract output text.
    keywords_text: str = response["choices"][0]["text"]  # without this the API prints out a lot of extra things we dont need

    # Strip whitespace.
    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|-", keywords_text)  # imported from re splits strings, have to add all the characters (,|\n|;|-)because the way the keywords are printed out
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]

    print(f"Keywords: {keywords_array}")
    return keywords_array


def generate_branding_snippet(prompt: str) -> str:   # reuse a lot of the code from above from the keywords function^^
    # Load your API key from an environment variable or secret management service
    openai.api_key = ("OPENAI_API_KEY")
    enriched_prompt = f"Generate upbeat branding snippet for {prompt}: "
    print(enriched_prompt)

    response = openai.Completion.create(
        engine="text-davinci-002", prompt=enriched_prompt, max_tokens=32 
    )

    # Extract output text.
    branding_text: str = response["choices"][0]["text"]

    # Strip whitespace.
    branding_text = branding_text.strip()

    # Add ... to the end of the statement.
    last_char = branding_text[-1]
    if last_char not in {".", "!", "?"}:
        branding_text += "..."   # the API can go past the linit so if it does it will end with ...

    print(f"Snippet: {branding_text}")
    return branding_text


if __name__ == "__main__":
    main()
