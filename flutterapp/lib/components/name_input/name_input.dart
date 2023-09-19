import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class NameInput extends StatefulWidget {
  NameInput({super.key, required this.onChange});

  final nameController = TextEditingController();
  final void Function(String) onChange; 

  @override
  State<NameInput> createState() => _NameInputState();
}

class _NameInputState extends State<NameInput> {

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
      SizedBox(
          width: 50,
          child: Text(
            'Nome ',
            style: GoogleFonts.roboto(fontSize: 14).copyWith(color: Colors.white),
          ),
        ),
        SizedBox(
          width: 200.0,
          height: 24,
          child: TextFormField(
            onChanged: (value) {
              widget.onChange(value);
            },
            controller: widget.nameController,
            validator: (value) {
              return (value == null || value.isEmpty)
                  ? "Digite um nome!"
                  : null;
            },
            style: GoogleFonts.roboto(fontSize: 14).copyWith(color: Colors.black),
            decoration: const InputDecoration(
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(),
                contentPadding:
                    EdgeInsets.only(left: 5, top: 0, bottom: 0, right: 5)),
            cursorHeight: 14,
          ),
        )
      ],
    );
  }
}
